import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Nav from "../components/UI/Nav.jsx";
import DataTestForm2A from "../components/forms/DataTestForm";
import DataTestList2A from "../components/lists/DataTestListClients";
import useDataTest2A from "../hooks/useDataTest";

const Contact2A = () => {
  const navigate = useNavigate();
  const token =
    localStorage.getItem("fakestore_token") ||
    sessionStorage.getItem("fakestore_token");
  const user =
    localStorage.getItem("fakestore_user") ||
    sessionStorage.getItem("fakestore_user") ||
    "";

  useEffect(() => {
    if (!token) navigate("/");
  }, [navigate, token]);

  const handleLogout = () => {
    localStorage.removeItem("fakestore_token");
    localStorage.removeItem("fakestore_user");
    localStorage.removeItem("fakestore_email");
    sessionStorage.removeItem("fakestore_token");
    sessionStorage.removeItem("fakestore_user");
    sessionStorage.removeItem("fakestore_email");
    navigate("/");
  };

  const {
    activeTab,
    setActiveTab,
    dataTest,
    loading,
    submitting,
    error,
    message,
    id,
    cancion,
    setCancion,
    cantante,
    setCantante,
    nacionalidad,
    setNacionalidad,
    openCreateForm,
    handleEdit,
    handleSubmit,
    handleDelete,
  } = useDataTest2A();

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
              onClick={() => setActiveTab("list")}
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
            <DataTestForm2A
              id={id}
              cancion={cancion}
              setCancion={setCancion}
              cantante={cantante}
              setCantante={setCantante}
              nacionalidad={nacionalidad}
              setNacionalidad={setNacionalidad}
              onSubmit={handleSubmit}
              onCancel={() => setActiveTab("list")}
              submitting={submitting}
              error={error}
              message={message}
            />
          ) : (
            <DataTestList2A
              dataTest={dataTest}
              loading={loading}
              error={error}
              onAdd={openCreateForm}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact2A;
