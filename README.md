# CRUD operations for saving exercises with the following properties:
 * username
 * activityName
 * sets
 * reps
 * rest
 * weight

# Directions:
1. Clone the project.
2. Run MongoDB as a service.
3. Run this program.

# Example POST request in ReactJS:
```
const createItem = async () => {
    const newItem = {
      username: 'Sky',
      activityName: 'push-ups',
      sets: 3,
      reps: 10,
      rest: 30,
      weight: 200
    }
    const res = await fetch('/exercises', {
      method: 'POST',
      body: JSON.stringify(newItem),
      headers: {
        'Content-Type': 'application/json'
      }
    });
}
```

# Example GET request in ReactJS:
* Returns array of objects.
```
const readItems = async () => {
    const username = 'Sky';
    const res = await fetch(`/exercises/${username}`);
    const data = await res.json();
    return data;
}
```

# Example PUT request in ReactJS:
* Returns 0 or 1.
```
const updateItem = async () => {
    const id = data[0]._id;
    const editItem = {
      username: 'Jacobson',
      activityName: 'bench press',
      sets: 5,
      reps: 55,
      rest: 555,
      weight: 5555
    }
    const res = await fetch(`/exercises/${id}`, {
      method: 'PUT',
      body: JSON.stringify(editItem),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return res;
}
```

# Example DELETE request in ReactJS
* Returns 0 or 1.
```
const deleteItem = async () => {
    const id = data[0]._id;
    const res = await fetch(`/exercises/${id}`, { method: 'DELETE' });
    return res;
}
```