import { useState } from "react";

type User = {
  name: string;
  age: string;
  city: string;
};

function ProfileForm() {
  const [user, setUser] = useState<User>({
    name: "",
    age: "",
    city: "",
  });

  const updateField = (
    field: keyof User,
    value: string
  ) => {
    setUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <h2>Profile Form</h2>

      <input
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => updateField("name", e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="Age"
        value={user.age}
        onChange={(e) => updateField("age", e.target.value)}
      />

      <br />
      <br />

      <input
        type="text"
        placeholder="City"
        value={user.city}
        onChange={(e) => updateField("city", e.target.value)}
      />

      <hr />

      <h3>User Details</h3>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>City: {user.city}</p>
    </div>
  );
}

export default ProfileForm;