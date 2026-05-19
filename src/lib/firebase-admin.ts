/**
 * Firebase Admin SDK / REST Fallback Client.
 * Uses Firestore REST API to bypass local Node.js gRPC and credential issues.
 */

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;

function fromFirestoreValue(value: any): any {
  if (!value) return null;
  const type = Object.keys(value)[0];
  const val = value[type];
  if (type === "mapValue") {
    return fromFirestoreFields(val.fields || {});
  }
  if (type === "arrayValue") {
    return (val.values || []).map(fromFirestoreValue);
  }
  if (type === "integerValue") {
    return parseInt(val, 10);
  }
  if (type === "doubleValue") {
    return parseFloat(val);
  }
  if (type === "booleanValue") {
    return val;
  }
  if (type === "nullValue") {
    return null;
  }
  return val;
}

function fromFirestoreFields(fields: any): any {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(fields)) {
    result[key] = fromFirestoreValue(value);
  }
  return result;
}

function toFirestoreValue(value: any): any {
  if (value === null || value === undefined) {
    return { nullValue: null };
  }
  if (typeof value === "boolean") {
    return { booleanValue: value };
  }
  if (typeof value === "number") {
    if (Number.isInteger(value)) {
      return { integerValue: value.toString() };
    }
    return { doubleValue: value };
  }
  if (typeof value === "string") {
    return { stringValue: value };
  }
  if (Array.isArray(value)) {
    return { arrayValue: { values: value.map(toFirestoreValue) } };
  }
  if (typeof value === "object") {
    return { mapValue: { fields: toFirestoreFields(value) } };
  }
  return { stringValue: String(value) };
}

function toFirestoreFields(obj: any): any {
  const fields: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    fields[key] = toFirestoreValue(value);
  }
  return fields;
}

// REST helper to fetch all documents in a collection
async function fetchCollectionDocs(path: string): Promise<any[]> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}?key=${apiKey}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      if (res.status === 404) return [];
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    const json = await res.json();
    if (!json.documents) return [];
    return json.documents.map((doc: any) => {
      const id = doc.name.split("/").pop();
      return {
        id,
        ...fromFirestoreFields(doc.fields || {})
      };
    });
  } catch (error) {
    console.error(`Error fetching collection ${path}:`, error);
    return [];
  }
}

// REST helper to set a single document
async function writeDocument(path: string, id: string, data: any, isUpdate = false): Promise<boolean> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}/${id}?key=${apiKey}`;
  try {
    const res = await fetch(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: toFirestoreFields(data) }),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(`Error writing document to ${path}/${id}:`, error);
    return false;
  }
}

// REST helper to add a document (auto-generated ID)
async function addDocument(path: string, data: any): Promise<string | null> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}?key=${apiKey}`;
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fields: toFirestoreFields(data) }),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    const json = await res.json();
    return json.name.split("/").pop();
  } catch (error) {
    console.error(`Error adding document to ${path}:`, error);
    return null;
  }
}

// REST helper to delete a document
async function deleteDocument(path: string, id: string): Promise<boolean> {
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${path}/${id}?key=${apiKey}`;
  try {
    const res = await fetch(url, {
      method: "DELETE",
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`HTTP ${res.status} - ${res.statusText}`);
    }
    return true;
  } catch (error) {
    console.error(`Error deleting document from ${path}/${id}:`, error);
    return false;
  }
}

class CollectionQuery {
  path: string;
  filters: ((doc: any) => boolean)[] = [];
  sortField?: string;
  sortDirection: "asc" | "desc" = "asc";
  limitVal?: number;
  offsetVal?: number;

  constructor(path: string) {
    this.path = path;
  }

  select(...fields: string[]) {
    return this;
  }

  doc(id: string) {
    return new DocRef(this.path, id);
  }

  where(field: string, op: string, value: any) {
    const queryCopy = new CollectionQuery(this.path);
    queryCopy.filters = [...this.filters];
    queryCopy.sortField = this.sortField;
    queryCopy.sortDirection = this.sortDirection;
    queryCopy.limitVal = this.limitVal;
    queryCopy.offsetVal = this.offsetVal;

    queryCopy.filters.push((doc: any) => {
      const docVal = doc[field];
      if (op === "==") return docVal === value;
      if (op === "!=") return docVal !== value;
      if (op === ">") return docVal > value;
      if (op === ">=") return docVal >= value;
      if (op === "<") return docVal < value;
      if (op === "<=") return docVal <= value;
      return true;
    });

    return queryCopy;
  }

  orderBy(field: string, direction: "asc" | "desc" = "asc") {
    const queryCopy = new CollectionQuery(this.path);
    queryCopy.filters = [...this.filters];
    queryCopy.sortField = field;
    queryCopy.sortDirection = direction;
    queryCopy.limitVal = this.limitVal;
    queryCopy.offsetVal = this.offsetVal;
    return queryCopy;
  }

  limit(num: number) {
    const queryCopy = new CollectionQuery(this.path);
    queryCopy.filters = [...this.filters];
    queryCopy.sortField = this.sortField;
    queryCopy.sortDirection = this.sortDirection;
    queryCopy.limitVal = num;
    queryCopy.offsetVal = this.offsetVal;
    return queryCopy;
  }

  offset(num: number) {
    const queryCopy = new CollectionQuery(this.path);
    queryCopy.filters = [...this.filters];
    queryCopy.sortField = this.sortField;
    queryCopy.sortDirection = this.sortDirection;
    queryCopy.limitVal = this.limitVal;
    queryCopy.offsetVal = num;
    return queryCopy;
  }

  count() {
    return {
      get: async () => {
        const allDocs = await fetchCollectionDocs(this.path);
        let filtered = allDocs;
        for (const filter of this.filters) {
          filtered = filtered.filter(filter);
        }
        return {
          data: () => ({ count: filtered.length })
        };
      }
    };
  }

  async get() {
    const allDocs = await fetchCollectionDocs(this.path);
    let filtered = allDocs;
    for (const filter of this.filters) {
      filtered = filtered.filter(filter);
    }

    if (this.sortField) {
      filtered.sort((a, b) => {
        const valA = a[this.sortField!];
        const valB = b[this.sortField!];
        if (valA === undefined || valA === null) return 1;
        if (valB === undefined || valB === null) return -1;
        if (valA < valB) return this.sortDirection === "asc" ? -1 : 1;
        if (valA > valB) return this.sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    if (this.offsetVal !== undefined) {
      filtered = filtered.slice(this.offsetVal);
    }

    if (this.limitVal !== undefined) {
      filtered = filtered.slice(0, this.limitVal);
    }

    return {
      docs: filtered.map(d => ({
        id: d.id,
        exists: true,
        data: () => {
          const { id, ...rest } = d;
          return rest;
        }
      })),
      empty: filtered.length === 0,
      size: filtered.length
    };
  }

  async add(data: any) {
    const id = await addDocument(this.path, data);
    return { id };
  }
}

class DocRef {
  path: string;
  id: string;

  constructor(path: string, id: string) {
    this.path = path;
    this.id = id;
  }

  async get() {
    const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/${this.path}/${this.id}?key=${apiKey}`;
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) {
        return {
          id: this.id,
          exists: false,
          data: () => undefined
        };
      }
      const json = await res.json();
      const fields = fromFirestoreFields(json.fields || {});
      return {
        id: this.id,
        exists: true,
        data: () => fields
      };
    } catch (error) {
      return {
        id: this.id,
        exists: false,
        data: () => undefined
      };
    }
  }

  async set(data: any) {
    const success = await writeDocument(this.path, this.id, data);
    return { success };
  }

  async update(data: any) {
    const success = await writeDocument(this.path, this.id, data, true);
    return { success };
  }

  async delete() {
    const success = await deleteDocument(this.path, this.id);
    return { success };
  }
}

class BatchWrapper {
  operations: { type: "set" | "update" | "delete"; docRef: DocRef; data?: any }[] = [];

  set(docRef: DocRef, data: any) {
    this.operations.push({ type: "set", docRef, data });
    return this;
  }

  update(docRef: DocRef, data: any) {
    this.operations.push({ type: "update", docRef, data });
    return this;
  }

  delete(docRef: DocRef) {
    this.operations.push({ type: "delete", docRef });
    return this;
  }

  async commit() {
    for (const op of this.operations) {
      if (op.type === "set" || op.type === "update") {
        await writeDocument(op.docRef.path, op.docRef.id, op.data, op.type === "update");
      } else if (op.type === "delete") {
        await deleteDocument(op.docRef.path, op.docRef.id);
      }
    }
  }
}

class AdminDbWrapper {
  collection(path: string) {
    return new CollectionQuery(path);
  }
  batch() {
    return new BatchWrapper();
  }
}

const adminDb = new AdminDbWrapper();

export { adminDb };
