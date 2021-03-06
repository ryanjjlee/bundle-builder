const BASE_URL = "/api/products";

export function getAll() {
  return fetch(BASE_URL).then((res) => res.json());
}

export function create(product) {
  return fetch(BASE_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

export function update(product) {
  return fetch(`${BASE_URL}/${product._id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(product),
  }).then((res) => res.json());
}

export function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  }).then((res) => res.json());
}
