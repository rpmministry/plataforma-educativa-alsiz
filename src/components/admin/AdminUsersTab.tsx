import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Shield,
  UserCheck,
  UserX,
  Link2,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Lock,
  X,
} from 'lucide-react';

interface UserItem {
  id: string;
  email: string;
  username: string;
  role: 'ADMIN' | 'ACADEMIC_COORDINATOR' | 'TEACHER' | 'REPRESENTATIVE' | 'STUDENT';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  first_name: string;
  last_name: string;
  created_at: string;
}

export const AdminUsersTab: React.FC = () => {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [representatives, setRepresentatives] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Modal de cambio de rol
  const [selectedUserForRole, setSelectedUserForRole] = useState<UserItem | null>(null);
  const [newRole, setNewRole] = useState<string>('STUDENT');
  const [roleJustification, setRoleJustification] = useState<string>('');
  const [roleError, setRoleError] = useState<string | null>(null);
  const [isSubmittingRole, setIsSubmittingRole] = useState(false);

  // Modal de vinculación familiar
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [selectedRepId, setSelectedRepId] = useState<string>('');
  const [selectedStudentId, setSelectedStudentId] = useState<string>('');
  const [relationshipType, setRelationshipType] = useState<string>('LEGAL_GUARDIAN');
  const [isPrimaryContact, setIsPrimaryContact] = useState<boolean>(true);
  const [linkError, setLinkError] = useState<string | null>(null);
  const [isSubmittingLink, setIsSubmittingLink] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      let url = '/api/v1/admin/users';
      const params = new URLSearchParams();
      if (roleFilter !== 'ALL') params.append('role', roleFilter);
      if (searchTerm.trim()) params.append('search', searchTerm.trim());
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const json = await res.json();
        setUsers(json.data?.users || []);
      }
    } catch (err) {
      console.error('Error al cargar usuarios:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRepsAndStudents = async () => {
    try {
      const [repsRes, usersRes] = await Promise.all([
        fetch('/api/v1/admin/representatives'),
        fetch('/api/v1/admin/users?role=STUDENT'),
      ]);
      if (repsRes.ok) {
        const repsData = await repsRes.json();
        setRepresentatives(repsData.data?.representatives || []);
      }
      if (usersRes.ok) {
        const studentsData = await usersRes.json();
        setStudents(studentsData.data?.users || []);
      }
    } catch (err) {
      console.error('Error al cargar representantes:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRepsAndStudents();
  }, [roleFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchUsers();
  };

  const handleOpenRoleModal = (user: UserItem) => {
    setSelectedUserForRole(user);
    setNewRole(user.role);
    setRoleJustification('');
    setRoleError(null);
  };

  const handleSaveRoleChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserForRole) return;
    if (!roleJustification.trim() || roleJustification.trim().length < 5) {
      setRoleError('Debe ingresar una justificación válida de al menos 5 caracteres.');
      return;
    }

    setIsSubmittingRole(true);
    setRoleError(null);

    try {
      const res = await fetch(`/api/v1/admin/users/${selectedUserForRole.id}/role`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: newRole,
          justification: roleJustification.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Error al cambiar rol');
      }

      setSelectedUserForRole(null);
      fetchUsers();
    } catch (err: any) {
      setRoleError(err.message || 'Error de conexión');
    } finally {
      setIsSubmittingRole(false);
    }
  };

  const handleToggleStatus = async (user: UserItem) => {
    const nextStatus = user.status === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    const confirmMsg = `¿Está seguro de cambiar el estado de @${user.username} a ${nextStatus}?`;
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await fetch(`/api/v1/admin/users/${user.id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: nextStatus,
          justification: `Cambio administrativo de estado a ${nextStatus} desde la consola central.`,
        }),
      });

      if (res.ok) {
        fetchUsers();
      }
    } catch (err) {
      console.error('Error al cambiar estado de usuario:', err);
    }
  };

  const handleSaveFamilyLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRepId || !selectedStudentId) {
      setLinkError('Seleccione un representante y un estudiante.');
      return;
    }

    setIsSubmittingLink(true);
    setLinkError(null);

    try {
      const res = await fetch('/api/v1/admin/representatives/link-student', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          representativeId: selectedRepId,
          studentId: selectedStudentId,
          relationshipType,
          isPrimaryContact,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error?.message || 'Error al vincular familia');
      }

      setIsLinkModalOpen(false);
      fetchRepsAndStudents();
    } catch (err: any) {
      setLinkError(err.message || 'Error de conexión');
    } finally {
      setIsSubmittingLink(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* 1. Barra de Herramientas y Filtros */}
      <div className="p-4 rounded-3xl bg-[#121820] border border-[#283545] flex flex-col sm:flex-row items-center justify-between gap-3">
        <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar por nombre o usuario..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-[#0A0D11] border border-[#283545] text-xs text-white focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-colors"
          >
            Buscar
          </button>
        </form>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-[#0A0D11] border border-[#283545] text-xs text-white focus:outline-none focus:border-purple-500"
          >
            <option value="ALL">Todos los Roles</option>
            <option value="ADMIN">Administradores</option>
            <option value="ACADEMIC_COORDINATOR">Coordinadores</option>
            <option value="TEACHER">Docentes</option>
            <option value="REPRESENTATIVE">Representantes</option>
            <option value="STUDENT">Estudiantes</option>
          </select>

          <button
            type="button"
            onClick={() => setIsLinkModalOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 text-xs font-bold transition-colors flex items-center gap-1.5"
          >
            <Link2 className="w-3.5 h-3.5" />
            <span>Vincular Tutela</span>
          </button>

          <button
            type="button"
            onClick={() => {
              fetchUsers();
              fetchRepsAndStudents();
            }}
            className="p-2 rounded-xl bg-[#0A0D11] hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-[#283545]"
            title="Refrescar usuarios"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-purple-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Tabla de Usuarios y Roles */}
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-purple-400" />
            <h3 className="text-sm font-bold text-white">Nómina de Cuentas del Sistema</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{users.length} cuentas registradas</span>
        </div>

        {isLoading ? (
          <div className="p-8 text-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto text-purple-400 mb-2" />
            <p className="text-xs">Cargando nómina...</p>
          </div>
        ) : users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#0A0D11] text-[10px] text-slate-400 uppercase tracking-wider border-b border-[#283545]">
                <tr>
                  <th className="py-2.5 px-3">Usuario / Nombre</th>
                  <th className="py-2.5 px-3">Correo</th>
                  <th className="py-2.5 px-3">Rol del Sistema</th>
                  <th className="py-2.5 px-3">Estado</th>
                  <th className="py-2.5 px-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e2733]">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-[#161f2a]/50 transition-colors">
                    <td className="py-3 px-3">
                      <p className="font-bold text-white">{u.first_name} {u.last_name}</p>
                      <p className="text-[10px] font-mono text-purple-300">@{u.username}</p>
                    </td>
                    <td className="py-3 px-3 font-mono text-[11px] text-slate-400">{u.email}</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        u.role === 'ADMIN'
                          ? 'border-purple-500/40 text-purple-300 bg-purple-500/10'
                          : u.role === 'TEACHER'
                          ? 'border-indigo-500/40 text-indigo-300 bg-indigo-500/10'
                          : u.role === 'REPRESENTATIVE'
                          ? 'border-emerald-500/40 text-emerald-300 bg-emerald-500/10'
                          : 'border-slate-600 text-slate-300 bg-slate-800/40'
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        u.status === 'ACTIVE'
                          ? 'bg-emerald-500/20 text-emerald-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}>
                        {u.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenRoleModal(u)}
                          className="px-2 py-1 rounded-lg bg-purple-500/10 hover:bg-purple-500/20 text-purple-300 border border-purple-500/30 text-[10px] font-bold transition-colors"
                        >
                          Cambiar Rol
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(u)}
                          className={`p-1 rounded-lg transition-colors border ${
                            u.status === 'ACTIVE'
                              ? 'bg-red-500/10 text-red-400 hover:bg-red-500/20 border-red-500/30'
                              : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/30'
                          }`}
                          title={u.status === 'ACTIVE' ? 'Suspender cuenta' : 'Reactivar cuenta'}
                        >
                          {u.status === 'ACTIVE' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-slate-400 text-xs">
            No se encontraron usuarios que coincidan con los filtros.
          </div>
        )}
      </div>

      {/* 3. Panel de Tutela Familiar y Representantes */}
      <div className="p-6 rounded-3xl bg-[#121820] border border-[#283545] space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link2 className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Tutela Familiar y Representantes Legales (MINEDUC / LOPDP)</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">{representatives.length} tutores registrados</span>
        </div>

        {representatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {representatives.map((rep) => (
              <div key={rep.id} className="p-4 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-bold text-white text-xs">{rep.first_name} {rep.last_name}</p>
                  <span className="text-[10px] font-mono text-slate-400">{rep.emergency_phone || 'Sin tel. emergencia'}</span>
                </div>
                <p className="text-[11px] text-slate-400">{rep.email}</p>
                <div className="pt-2 border-t border-[#1a232e]">
                  <p className="text-[10px] font-semibold text-slate-400 mb-1">Estudiantes legalmente a cargo:</p>
                  {rep.students?.length > 0 ? (
                    <div className="flex flex-wrap gap-1.5">
                      {rep.students.map((st: any) => (
                        <span
                          key={st.id}
                          className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/30"
                        >
                          🎓 {st.first_name} {st.last_name} ({st.relationship_type})
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[10px] italic text-slate-500">Ningún estudiante vinculado actualmente.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 text-center py-4">No hay representantes registrados.</p>
        )}
      </div>

      {/* Modal de Cambio de Rol */}
      {selectedUserForRole && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121820] border border-[#283545] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#283545]">
              <div className="flex items-center gap-2 text-purple-400">
                <Shield className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Cambiar Privilegios de Usuario</h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedUserForRole(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveRoleChange} className="space-y-4 text-xs">
              <div className="p-3 rounded-2xl bg-[#0A0D11] border border-[#1e2733] space-y-1">
                <p className="text-slate-400">Usuario objetivo:</p>
                <p className="font-bold text-white text-sm">
                  {selectedUserForRole.first_name} {selectedUserForRole.last_name} (@{selectedUserForRole.username})
                </p>
                <p className="text-[10px] text-purple-300">Rol actual: {selectedUserForRole.role}</p>
              </div>

              {roleError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {roleError}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Nuevo Rol de Acceso *</label>
                <select
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="STUDENT">Estudiante (Acceso a cursos y profesores IA)</option>
                  <option value="REPRESENTATIVE">Representante Legal / Padre de Familia</option>
                  <option value="TEACHER">Docente / Profesor</option>
                  <option value="ACADEMIC_COORDINATOR">Coordinador Académico</option>
                  <option value="ADMIN">Administrador General del Sistema</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Justificación del Cambio (Auditoría LOPDP) *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Explique el motivo del cambio de rol para registro en el libro mayor..."
                  value={roleJustification}
                  onChange={(e) => setRoleJustification(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedUserForRole(null)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingRole}
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmittingRole ? 'Guardando...' : 'Confirmar Cambio de Rol'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Vinculación de Tutela Familiar */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#121820] border border-[#283545] rounded-3xl p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-[#283545]">
              <div className="flex items-center gap-2 text-indigo-400">
                <Link2 className="w-4 h-4" />
                <h3 className="text-sm font-bold text-white">Vincular Tutela Familiar</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsLinkModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveFamilyLink} className="space-y-4 text-xs">
              {linkError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {linkError}
                </div>
              )}

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Representante Legal *</label>
                <select
                  value={selectedRepId}
                  onChange={(e) => setSelectedRepId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Seleccione representante...</option>
                  {representatives.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.first_name} {r.last_name} ({r.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-300">Estudiante *</label>
                <select
                  value={selectedStudentId}
                  onChange={(e) => setSelectedStudentId(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="">Seleccione estudiante...</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.first_name} {s.last_name} (@{s.username})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Parentesco *</label>
                  <select
                    value={relationshipType}
                    onChange={(e) => setRelationshipType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#0A0D11] border border-[#283545] text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="FATHER">Padre</option>
                    <option value="MOTHER">Madre</option>
                    <option value="LEGAL_GUARDIAN">Tutor Legal</option>
                    <option value="OTHER">Otro Parentesco</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Contacto Primario</label>
                  <div className="pt-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isPrimaryContact}
                        onChange={(e) => setIsPrimaryContact(e.target.checked)}
                        className="rounded bg-[#0A0D11] border-[#283545] text-indigo-600 focus:ring-0"
                      />
                      <span className="text-slate-300">Es contacto principal</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsLinkModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingLink}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold transition-colors disabled:opacity-50"
                >
                  {isSubmittingLink ? 'Vinculando...' : 'Registrar Tutela'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

