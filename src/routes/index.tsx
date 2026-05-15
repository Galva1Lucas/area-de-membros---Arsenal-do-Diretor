import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Dinâmicas de Teatro — Área de Membros" },
      {
        name: "description",
        content:
          "Plataforma premium de estudos para professores de teatro, atores e alunos.",
      },
    ],
  }),
});

function Index() {
  useEffect(() => {
    window.location.replace("/app/index.html");
  }, []);
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        background: "#0a0a0c",
        color: "#F5A623",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <p>Carregando Área de Membros…</p>
    </div>
  );
}
