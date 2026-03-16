const BASE_URL = "http://localhost:3000";

async function fetchData(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  const json = await res.json();
  return json.answer;
}

export async function getCategories() {
  return fetchData("/categories");
}

export async function getParts() {
  return fetchData("/parts");
}

export async function getServices() {
  return fetchData("/services");
}
