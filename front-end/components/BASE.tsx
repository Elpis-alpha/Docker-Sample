import { useEffect, useState } from "react";

const BASE = () => {
  const [listOfCats, setListOfCats] = useState<
    {
      name: string;
      cuteness: number;
    }[]
  >([]);
  const [listofUsers, setListofUsers] = useState<
    {
      name: string;
      age: number;
    }[]
  >([]);
  const [refetchData, setRefetchData] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) =>
        setTimeout(() => {
          resolve(1);
        }, 1000)
      );

      const response = await fetch("http://api.localhost/cats");
      const data = await response.json();
      console.log(data);
      if (data.data) setListOfCats(data.data);

      const response2 = await fetch("http://api.localhost/users");
      const data2 = await response2.json();
      if (data2.data) setListofUsers(data2.data);
    };
    if (refetchData) {
      fetchData();
      setRefetchData(false);
    }
  }, [refetchData]);

  return (
    <div className="w-full flex-1 items-center justify-center p-20 flex flex-col gap-10">
      <button
        className="bg-slate-500 px-6 py-2 text-white rounded-xl font-bold shadow"
        onClick={() => setRefetchData(true)}
      >
        Refetch Data
      </button>

      <div className="min-w-72">
        <h2 className="font-bold text-xl">List of users:</h2>
        <ul className="flex flex-col gap-2 pt-2"> 
          {listofUsers.map((user) => (
            <li key={user.name}>
              Name: {user.name} <br />
              Age: {user.age}
            </li>
          ))}
        </ul>
      </div>

      <div className="min-w-72">
        <h2 className="font-bold text-xl">List of cats:</h2>
        <ul className="flex flex-col gap-2 pt-2">
          {listOfCats.map((cat) => (
            <li key={cat.name}>
              Name:{cat.name} <br />
              Cuteness: {cat.cuteness}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default BASE;
