import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import DataTestClients from "../components/forms/DataTestClients";
import DataTestListClients from "../components/lists/DataTestListClients";
import useDataClients from "../hooks/clients/useDataClients";

const Clients = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const token =
    localStorage.getItem("fakestore_token") ||
    sessionStorage.getItem("fakestore_token");

  const methods = useForm();
  const {
    dataClients,
    register,
    handleSubmit,
    errors,
    deleteClient,
    handleUpdateClient,
  } = useDataClients(methods);

  const [activeTab, setActiveTab] = useState(id ? "form" : "list");

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  useEffect(() => {
    setActiveTab(id ? "form" : "list");
  }, [id]);

  const openCreateForm = () => {
    methods.reset({});
    setActiveTab("form");
  };

  const cancelForm = () => {
    setActiveTab("list");
    navigate("/clients");
  };

  return (
    <div>
      <div className="flex min-h-screen bg-gradient-to-br from-slate-100 via-white to-blue-50 px-4 py-10">
        <div className="mx-auto w-full max-w-6xl space-y-6">
          <header className="rounded-3xl px-6 py-8 text-white shadow-xl shadow-slate-200">
            <h1 className="text-3xl text-[#472825] font-bold sm:text-4xl">Clientes</h1>
          </header>

          <div className="mt flex flex-wrap gap-3 justify-end">
            <button
              type="button"
              onClick={() => (id ? cancelForm() : setActiveTab("list"))}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "list"
                  ? "bg-[#D3AB80] text-slate-900"
                  : "bg-[#472825] text-white hover:bg-[#D3AB80]/50"
              }`}
            >
              Ver lista
            </button>
            <button
              type="button"
              onClick={openCreateForm}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTab === "form"
                  ? "bg-[#D3AB80] text-slate-900"
                  : "bg-[#472825] text-white hover:bg-[#D3AB80]/50"
              }`}
            >
              Nuevo registro
            </button>
          </div>

          {activeTab === "form" ? (
            <DataTestClients
              id={id}
              register={register}
              errors={errors}
              onSubmit={handleSubmit}
              onCancel={cancelForm}
            />
          ) : (
            <DataTestListClients
              dataClients={dataClients}
              onEdit={handleUpdateClient}
              onDelete={deleteClient}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
