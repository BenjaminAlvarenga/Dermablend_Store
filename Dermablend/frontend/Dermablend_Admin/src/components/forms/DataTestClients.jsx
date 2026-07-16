const DataTestClients = ({ id, register, errors, onSubmit, onCancel }) => {
  return (
    <section className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {id ? "Editar cliente" : "Crear cliente"}
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
          <label htmlFor="birthdate" className="block text-sm font-medium text-gray-700">
            Fecha de nacimiento
          </label>
          <input
            type="date"
            id="birthdate"
            {...register("birthdate", { required: "La fecha de nacimiento es obligatoria" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          {errors?.birthdate ? (
            <p className="mt-1 text-sm text-red-600">{errors.birthdate.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
            Teléfono
          </label>
          <input
            type="text"
            id="phone"
            {...register("phone", { required: "El teléfono es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
            placeholder="Ingresa el teléfono"
          />
          {errors?.phone ? (
            <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="skin_type" className="block text-sm font-medium text-gray-700">
            Tipo de piel
          </label>
          <select
            id="skin_type"
            {...register("skin_type", { required: "El tipo de piel es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="grasa">Grasa</option>
            <option value="seca">Seca</option>
            <option value="mixta">Mixta</option>
          </select>
          {errors?.skin_type ? (
            <p className="mt-1 text-sm text-red-600">{errors.skin_type.message}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="skin_tone" className="block text-sm font-medium text-gray-700">
            Tono de piel
          </label>
          <select
            id="skin_tone"
            {...register("skin_tone", { required: "El tono de piel es obligatorio" })}
            className="mt-1 block w-full rounded-lg border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            <option value="blanca">Blanca</option>
            <option value="trigueña">Trigueña</option>
            <option value="morena">Morena</option>
          </select>
          {errors?.skin_tone ? (
            <p className="mt-1 text-sm text-red-600">{errors.skin_tone.message}</p>
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

        {id ? (
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_verified"
              {...register("is_verified")}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-200"
            />
            <label htmlFor="is_verified" className="text-sm font-medium text-gray-700">
              Correo verificado (permite al cliente realizar compras)
            </label>
          </div>
        ) : null}

        <button
          type="submit"
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-300"
        >
          {id ? "Actualizar cliente" : "Crear cliente"}
        </button>
      </form>
    </section>
  );
};

export default DataTestClients;
