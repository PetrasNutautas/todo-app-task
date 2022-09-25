export async function getAllTasks() {
  try {
    const response = await fetch("/api/tasks");
    return await response.json();
  } catch (error) {
    return [];
  }
}

export async function postTasks(data) {
  const response = await fetch(`/api/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ tasks: data }),
  });
  return await response.json();
}
