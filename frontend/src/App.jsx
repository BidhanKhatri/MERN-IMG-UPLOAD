import { useEffect, useState } from "react";

function App() {
  const [file, setFile] = useState(null);
  const [images, setImages] = useState();

  //function for storing the image in the database
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(file);

    const formData = new FormData();
    formData.append("file", file);

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      body: formData,
    });
  }

  //function to get the images from the database

  async function getAllImages() {
    const response = await fetch("http://localhost:4000/get-images");
    const data = await response.json();
    setImages(data);
    console.log(data);
  }

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <>
      <form>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button onClick={handleSubmit}>Upload</button>
      </form>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        {images &&
          images.map((items) => (
            <div key={items._id}>
              <img
                src={`http://localhost:4000/images/${items.image}`}
                alt="image"
                style={{ width: "300px", height: "300px", marginTop: "1rem" }}
              />
            </div>
          ))}
      </div>
    </>
  );
}

export default App;
