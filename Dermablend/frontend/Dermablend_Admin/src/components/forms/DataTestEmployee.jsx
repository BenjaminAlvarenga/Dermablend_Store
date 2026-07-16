const DataTestEmployee = ({ id, register, errors, onSubmit, onCancel }) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {id ? "Editar empleado" : "Crear empleado"}
          </h2>
        </div>

        {id ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Cancelar edición
          </button>
        ) : null}
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            id="name"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el nombre"
          />
          {errors?.name ? (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", { required: "El email es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el email"
          />
          {errors?.email ? (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          ) : null}
        </div>

        {!id ? (
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              {...register("password", { required: "La contraseña es obligatoria" })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              placeholder="Ingresa la contraseña"
            />
            {errors?.password ? (
              <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
            ) : null}
          </div>
        ) : null}

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700">
            Rol
          </label>
          <select
            id="role"
            {...register("role", { required: "El rol es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="Employee">Employee</option>
            <option value="Admin">Admin</option>
          </select>
          {errors?.role ? (
            <p className="mt-1 text-sm text-red-600">{errors.role.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="hire_date" className="block text-sm font-medium text-gray-700">
            Fecha de contratación
          </label>
          <input
            type="date"
            id="hire_date"
            {...register("hire_date", { required: "La fecha de contratación es obligatoria" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {errors?.hire_date ? (
            <p className="mt-1 text-sm text-red-600">{errors.hire_date.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
            Salario
          </label>
          <input
            type="number"
            step="0.01"
            id="salary"
            {...register("salary", { required: "El salario es obligatorio", min: { value: 0.01, message: "El salario debe ser mayor a 0" } })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el salario"
          />
          {errors?.salary ? (
            <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700">
            Estatus
          </label>
          <select
            id="status"
            {...register("status")}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="active">Activo</option>
            <option value="inactive">Inactivo</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-300"
        >
          {id ? "Actualizar empleado" : "Crear empleado"}
        </button>
      </form>
    </section>
  );
};

export default DataTestEmployee;
