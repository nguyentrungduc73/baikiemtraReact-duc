import { useRef, useState } from "react";
import { Space, Table, Button } from "antd";

import { Modal } from "antd";
import "./Todoinput.css";

function TodoInput() {
  const [itemEdit, setItemEdit] = useState({});
  const [list, setList] = useState(
    JSON.parse(localStorage.getItem("list")) ?? []
  );
  const [indexEdit, setIndexEdit] = useState(undefined);
  const inputIDref = useRef();
  const inputNameref = useRef();
  const inputQuantityref = useRef();
  const inputPriceref = useRef();
  const idEditRef = useRef();
  const nameEditRef = useRef();
  const quantityEditRef = useRef();
  const priceEditRef = useRef();
  const inputSearchRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [indexDelete, setIndexDelete] = useState(undefined);

  const showModal = (index) => {
    setIsModalOpen(true);
    setIndexDelete(index);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleDelete();
    setIndexDelete(undefined);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [isModaEditlOpen, setIsModalEditOpen] = useState(false);
  const showModalEdit = ({ id, name, quantity, price }, index) => {
    setIsModalEditOpen(true);
    setItemEdit((pre) => {
      return { ...pre, id, name, quantity, price };
    });

    setIndexEdit(index);
  };
  const handleOkEdit = () => {
    setIsModalEditOpen(false);
    let validateCheck = validate(
      idEditRef.current.value,
      nameEditRef.current.value,
      quantityEditRef.current.value,
      priceEditRef.current.value
    );
    if (validateCheck) {
      setList((oldList) => {
        let editList = [...oldList];
        editList.splice(indexEdit, 1, {
          key: indexEdit,
          id: itemEdit.id,
          name: itemEdit.name,
          quantity: itemEdit.quantity,
          price: itemEdit.price,
        });
        localStorage.setItem("list", JSON.stringify(editList));
        setIndexEdit(undefined);
        return editList;
      });
      clearInput();
    }
  };
  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
  };

  const clearInput = () => {
    inputIDref.current.value = "";
    inputNameref.current.value = "";
    inputQuantityref.current.value = "";
    inputPriceref.current.value = "";
  };

  const handleSubmit = () => {
    const validateCheck = validate(
      inputIDref.current.value,
      inputNameref.current.value,
      inputQuantityref.current.value,
      inputPriceref.current.value
    );

    if (validateCheck) {
      setList((oldList) => {
        const addList = [
          ...oldList,
          {
            key: list.length,
            id: inputIDref.current.value,
            name: inputNameref.current.value,
            quantity: inputQuantityref.current.value,
            price: inputPriceref.current.value,
          },
        ];
        localStorage.setItem("list", JSON.stringify(addList));
        return addList;
      });

      clearInput();
    }
  };
  const handleDelete = () => {
    setList((oldList) => {
      const deleteList = [...oldList];
      deleteList.splice(indexDelete, 1);
      localStorage.setItem("list", JSON.stringify(deleteList));

      return deleteList;
    });
  };
  const validate = (idRef, nameRef, quantityRef, priceRef) => {
    const checkIdDuplicate = list.filter((item, index) => {
      return item.id === idRef;
    });
    const checkNameDuplicate = list.filter((item, index) => {
      return item.name === nameRef;
    });

    if (idRef.length < 1) {
      alert("ko dc de trong ID");
      return false;
    } else if (nameRef.trim().length < 5 || nameRef.trim().length > 13) {
      alert("Ten san pham phai tu 5-12 ki tu");
      return false;
    } else if (quantityRef.length < 1 || quantityRef.length > 5) {
      alert("Số lượng sản phẩm phải từ 1-5 kí tự");
      return false;
    } else if (priceRef.length < 4 || priceRef.length > 12) {
      alert("Giá sản phẩm phải từ 4 - 12 kí tự");
      return false;
    } else if (checkIdDuplicate.length > 0) {
      alert("Id bị trùng");
      return false;
    } else if (checkNameDuplicate.length > 0) {
      alert("Tên sản phẩm bị trùng");
      return false;
    } else {
      return true;
    }
  };
  const handleSortName = () => {
    setList((pre) => {
      const sortName = [...pre];
      sortName.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
      });
      // localStorage.setItem("list", JSON.stringify(sortName));
      return sortName;
    });
  };

  const filterQuantity = () => {
    setList((pre) => {
      const filterList = [...pre];
      return filterList.filter((item, index) => item.quantity < 10);
    });
  };

  const handleFindName = () => {
    setList((pre) => {
      const findList = [...pre];
      return findList.filter((item, index) =>
        item.name
          .toUpperCase()
          .includes(inputSearchRef.current.value.toUpperCase())
      );
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record, index) => (
        <Space>
          <button onClick={() => showModalEdit(record, index)}>Edit</button>
          <button onClick={() => showModal(index)}>Delete</button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="box-inp">
        <h2>Nhập sản phẩm tại đây</h2>
        <label htmlFor="">ID</label>
        <input
          ref={inputIDref}
          type="number"
          name=""
          id="inp-id"
          placeholder="Nhap id tai day"
        />
        <label htmlFor="">NameSp</label>
        <input
          ref={inputNameref}
          type="text"
          name=""
          id="inp-name"
          placeholder="Nhap ten tai day"
        />
        <label htmlFor="">Quantity</label>
        <input
          ref={inputQuantityref}
          type="number"
          name=""
          id="inp-quantity"
          placeholder="Nhap so luong tai day"
        />
        <label htmlFor="">Price</label>
        <input
          ref={inputPriceref}
          type="number"
          name=""
          id="inp-price"
          placeholder="Nhap gia tai day"
        />
        <button className="btn-add" onClick={handleSubmit}>
          Add
        </button>
      </div>
      <Space wrap>
        <Button type="primary" onClick={handleSortName}>
          SortName
        </Button>
        <Button type="primary" danger onClick={filterQuantity}>
          Out of stock warning
        </Button>
        <input
          className="inp-search"
          ref={inputSearchRef}
          type="text"
          placeholder="Nhập tên sản phẩm cần tìm"
        />
        <Button onClick={handleFindName}>Tìm</Button>
      </Space>
      <Table dataSource={list} columns={columns} />

      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        className="delete-modal"
      >
        <p>
          Ban co chac muon xoa san pham{" "}
          {indexDelete !== undefined ? list[indexDelete]["id"] : null}
        </p>
      </Modal>
      <Modal
        title="edit-modal"
        open={isModaEditlOpen}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        className="edit-modal"
      >
        <label htmlFor="">Id Edit</label>
        <input
          ref={idEditRef}
          value={itemEdit["id"]}
          type="text"
          name=""
          id=""
          onChange={(e) =>
            setItemEdit((pre) => {
              return { ...pre, id: e.target.value };
            })
          }
        />
        <label htmlFor="">Name edit</label>
        <input
          ref={nameEditRef}
          value={itemEdit["name"]}
          type="text"
          onChange={(e) =>
            setItemEdit((pre) => {
              return { ...pre, name: e.target.value };
            })
          }
        />
        <label htmlFor="">Quantity Edit</label>
        <input
          ref={quantityEditRef}
          value={itemEdit["quantity"]}
          type="text"
          onChange={(e) =>
            setItemEdit((pre) => {
              return { ...pre, quantity: e.target.value };
            })
          }
        />
        <label htmlFor="">Price edit</label>
        <input
          ref={priceEditRef}
          value={itemEdit["price"]}
          type="text"
          onChange={(e) =>
            setItemEdit((pre) => {
              return { ...pre, price: e.target.value };
            })
          }
        />
      </Modal>
    </div>
  );
}

export default TodoInput;
