import { useEffect } from "react";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

let MAX_LENGTH = 50;
function Main() {
  const [isClicked, setIsClicked] = useState(false);

  const [List, setList] = useState("");
  const [Lists, setLists] = useState([]);

  const [value, setValue] = useState("To do ...");

  // useEffect(() => {
  //   let ListString = localStorage.getItem("Lists")
  //   if(ListString){
  //     let Lists = JSON.parse(localStorage.getItem("Lists")) 
  //     setLists(Lists)
  //   }
  // }, [])

  useEffect(() => {
    const ListString = localStorage.getItem("Lists");
    if (ListString) {
      try {
        const Lists = JSON.parse(ListString);
        setLists(Lists);
      } catch (error) {
        console.error("Error parsing JSON from localStorage", error);
      }
    }
  }, []);
  
  const handleChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length >= MAX_LENGTH) {
      alert(`Maximum length of ${MAX_LENGTH} characters reached`);
    } else {
      setValue(inputValue);
      setList(inputValue);
    }
  };

  const saveToLocal = (params) =>{
    localStorage.setItem("Lists", JSON.stringify(params));
  }

  const handleAdd = () => {
    const updatedLists = [
      ...Lists,
      { id: uuidv4(), List, isCompleted: false, isEdit: false }
    ];
    setLists(updatedLists);
    setValue("To do ...");
    setList("");
    saveToLocal(updatedLists);
  };
  
  
  const handleTick = (e) => {
    let id = e.target.name;
    let index = Lists.findIndex((item) => {
      return item.id === id;
    });
    
    let newLists = [...Lists];
    
    newLists[index].isCompleted = !newLists[index].isCompleted;
    setLists(newLists);
    saveToLocal(newLists);
  };

  const handleEdit = (e, id) => {
    
    const updatedLists = Lists.map((item) =>
      item.id === id ? { ...item, isEdit: !item.isEdit } : item
    );
    setLists(updatedLists);
    saveToLocal(updatedLists);
    
  };
  
  const handleInputChange = (e, id) => {
    const newValue = e.target.value;
    const updatedLists = Lists.map((item) =>
      item.id === id ? { ...item, List: newValue } : item
    );
    setLists(updatedLists);
    saveToLocal(updatedLists);
  };

  const handleDelete = (e, id) => {
    let newLists = [...Lists];

    let index = Lists.findIndex((item) => {
      return item.id === id;
    });

    newLists = newLists.reduce((acc, val, i) => {
      if (i !== index) acc.push(val);
      return acc;
    }, []);
    
    setLists(newLists);
    saveToLocal(newLists);
  };

  return (
    <div className=" mx-auto top-10 relative justify-center items-center w-3/6 h-[35rem] min-h-[20%]">
      <div className="bar relative top-3 flex gap-10 justify-center">
        <input
          type="text"
          name="name"
          placeholder="To Do ..."
          value={List}
          onChange={handleChange}
          className={`search border-b ${
            isClicked ? "border-white" : "border-white"
          } bg-[#232323] text-white w-[70%] flex justify-start items-center focus:outline-none placeholder: text-start `}
          //   onClick={handleClick}
        />
        {/* <div className="filter"></div> */}

        <button
          onClick={handleAdd}
          className="add w-8 h-8 border border-white rounded-full flex justify-center items-center"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 21 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21 10.5C21 11.0544 20.5511 11.5034 19.9966 11.5034H11.5041V19.9966C11.5041 20.5503 11.0544 21 10.5 21C9.94556 21 9.49661 20.5503 9.49661 19.9966V11.5034H1.00338C0.44969 11.5034 0 11.0544 0 10.5C0 10.2232 0.112235 9.97175 0.294057 9.79067C0.475878 9.60885 0.726537 9.49661 1.00338 9.49661H9.49661V1.00338C9.49661 0.448942 9.94556 0 10.5 0C10.7776 0 11.0283 0.112235 11.2101 0.294057C11.3919 0.47513 11.5041 0.726537 11.5041 1.00338V9.49661H19.9966C20.5511 9.49661 21 9.94556 21 10.5Z"
              fill="white"
            />
          </svg>
        </button>
      </div>

      <div className="mx-auto todo relative top-6 bg-[#393939] rounded-xl  w-[90%] h-[30rem] flex justify-center">
        {Lists.length === 0 ? (
          <div className="flex justify-center h-full w-full items-center text-white opacity-30">
            No To do
          </div>
        ) : (
          <ul className="justify-center items-start w-[95%] h-auto relative top-3">
            {Lists.map((item) => (
              <li
                key={item.id}
                className="flex justify-center items-center min-h-10 top-2"
              >
                <button
                  name={item.id}
                  className="w-4 h-4 rounded-full border border-white text-white text-center text-xs mx-2 flex justify-center items-center"
                  onClick={handleTick}
                >
                  {item.isCompleted ? "✓" : ""}
                </button>

                {/* <span className="text-white text-start  flex w-[75%] right-3 h-full items-center border-b border-b-white ">{item.List}</span> */}
                
                <input
                  type="text"
                  value={item.List}
                  onChange={item.isEdit ? (e) => handleInputChange(e, item.id) : undefined}
                  readOnly={!item.isEdit}
                  className={`search border-b ${
                    isClicked ? "border-white" : "border-white"
                  } ${item.isEdit ? "border-b-2" : ""} bg-[#393939] text-white w-[75%] justify-start right-3 h-full items-center focus:outline-none`}
                />

                <button
                  onClick={(e) => {
                    handleEdit(e, item.id);
                  }}
                  className=" w-8 h-8 border border-white rounded-full flex mx-2 justify-center items-center"
                >
                  {item.isEdit ? (
                    <svg
                      width="11"
                      height="17"
                      viewBox="0 0 17 23"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.0161 22.8497L8.8926 16.3054C8.66555 16.105 8.33445 16.105 8.11686 16.3054L0.983862 22.8497C0.595993 23.2004 0 22.9098 0 22.3686V0.631372C0 0.28061 0.264886 0 0.595993 0H16.4135C16.7446 0 17.0095 0.28061 17.0095 0.631372V22.3686C17 22.9098 16.404 23.2004 16.0161 22.8497Z"
                        fill="white"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 26 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5149 2.5718L3.23926 16.876L9.05094 22.6993L23.3266 8.3951L17.5149 2.5718Z"
                        fill="white"
                      />
                      <path
                        d="M25.2459 6.61183L24.1899 7.66994L18.3789 1.84731L19.4959 0.728041C20.4634 -0.241378 22.0322 -0.241378 22.9966 0.728041L25.2429 2.97881C26.25 3.98186 26.25 5.60878 25.2459 6.61183Z"
                        fill="white"
                      />
                      <path
                        d="M2.8231 17.9082L0 25.9999L8.02676 23.2599L2.8231 17.9082Z"
                        fill="white"
                      />
                    </svg>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    handleDelete(e, item.id);
                  }}
                  className=" w-8 h-8 border border-white rounded-full flex mx-2 justify-center items-center"
                >
                  <svg
                    width="11"
                    height="17"
                    viewBox="0 0 20 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.3587 5.69141H12.2475C12.1679 5.69141 12.0882 5.69776 12.0086 5.71046L1.0957 7.20961L2.18221 24.6689C2.23 25.4185 2.85132 25.9997 3.60327 25.9997H16.1889C16.9855 25.9997 17.645 25.3804 17.696 24.5895L18.8526 6.21547C18.8717 5.93279 18.6455 5.69141 18.3587 5.69141ZM6.2574 22.5631L6.17138 22.5727C5.99295 22.5981 5.82726 22.471 5.80496 22.2932L4.26601 9.50279C4.24052 9.28681 4.39664 9.08989 4.61649 9.06448C4.63242 9.06131 4.64836 9.06131 4.66429 9.06131C4.87139 9.06131 5.05301 9.22011 5.07531 9.42974L6.5601 22.1725C6.5824 22.363 6.44539 22.5377 6.2574 22.5631ZM10.0267 22.6171H9.94069C9.75908 22.6235 9.60932 22.4806 9.60614 22.2995L9.45957 9.42021C9.45638 9.20106 9.63481 9.02002 9.85466 9.02002C10.0841 9.02002 10.2721 9.20423 10.2721 9.43292L10.3708 22.2614C10.3708 22.452 10.2179 22.6108 10.0267 22.6171ZM14.0254 22.3186C14.0031 22.4996 13.8375 22.6235 13.659 22.6013L13.573 22.5885C13.3818 22.5631 13.248 22.3916 13.2703 22.2011L14.7519 9.45833C14.7774 9.24552 14.9558 9.08989 15.1661 9.08989C15.182 9.08989 15.198 9.08989 15.2139 9.09307C15.4306 9.1153 15.5899 9.31222 15.5644 9.53138L14.0254 22.3186Z"
                      fill="white"
                    />
                    <path
                      d="M19.9904 2.67441C20.0764 3.36999 19.5825 4.0084 18.8847 4.10051L1.40824 6.39052C0.745502 6.4731 0.143303 6.00302 0.063647 5.34238L0.0126673 4.93266C-0.098851 4.04016 0.538396 3.22707 1.43373 3.1159L18.1997 1.0514C19.0632 0.943411 19.8502 1.55641 19.9585 2.41715L19.9904 2.67441Z"
                      fill="white"
                    />
                    <path
                      d="M13.0413 0.930639L6.54454 1.75644C6.47125 1.17203 6.88546 0.638433 7.46854 0.565381L11.8464 0.0095543C12.4327 -0.0666734 12.968 0.346227 13.0413 0.930639Z"
                      fill="white"
                    />
                  </svg>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Main;
