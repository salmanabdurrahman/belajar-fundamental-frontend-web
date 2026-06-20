const BASE_URL = "https://notes-api.dicoding.dev/v2";

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const result = parseJson(text);

  if (!response.ok || result.status === "fail") {
    throw new Error(result.message || "Request failed.");
  }

  return result.data;
}

function parseJson(text) {
  try {
    return text ? JSON.parse(text) : {};
  } catch {
    throw new Error("Server returned an invalid response.");
  }
}

export const NotesApi = {
  getNotes: () => request("/notes"),
  getArchivedNotes: () => request("/notes/archived"),
  addNote: ({ title, body }) =>
    request("/notes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, body }),
    }),
  archiveNote: (id) => request(`/notes/${id}/archive`, { method: "POST" }),
  unarchiveNote: (id) => request(`/notes/${id}/unarchive`, { method: "POST" }),
  deleteNote: (id) => request(`/notes/${id}`, { method: "DELETE" }),
};
