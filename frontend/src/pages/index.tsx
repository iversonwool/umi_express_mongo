import {
  ProTable,
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormDigit,
} from "@ant-design/pro-components";
import type {ProColumns, ActionType,ProFormInstance} from '@ant-design/pro-components'
import { users, createUser, updateUser, deleteUser } from "@/services/users";
import { Button, Modal, message } from "antd";
import { useRef, useState } from "react";

interface User {
  name: string;
  age: number;
  sex: string;
  _id: string;
}

export default function HomePage() {
  const [open, setModalOpen] = useState(false);
  function onUpdate(item: User) {
    formRef.current?.setFieldsValue(item)
    setModalOpen(true)
  }
  function onDelete(_id: string) {
    Modal.confirm({
      title:'Are you sure you want to delete?', 
      onOk: () => {
        return new Promise((resolve, reject) => {
          deleteUser(_id)
            .then((data) => {
              const {code} = data
              if (code ===  0) {
                resolve(true)
                actionRef.current?.reload();
              } else {
                reject()
              }             
            })
        }).catch((err) => {
          console.log(err)
        });
      },
    })
  }

  const columns: ProColumns<User>[] = [
    {
      title: "Name",
      dataIndex: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      valueType: 'digit'
    },
    {
      title: "Gender",
      dataIndex: "sex",
    },
    {
      title: 'Operation',
      dataIndex: "operation",
      render(t, r) {
        return [
          <Button type="link" key="update" onClick={() => {onUpdate(r)}}>修改</Button>,
          <Button type="link" key="delete" onClick={() => {onDelete(r._id)}}>删除</Button>
        ]
      }
    }
  ];
  const actionRef = useRef<ActionType>()
  const formRef = useRef<ProFormInstance>()
  function onCreate() {
    setModalOpen(true);
  }
  return (
    <div>
      <h2>Welcome Users Admin</h2>
      <ProTable<User>
        columns={columns}
        request={users}
        rowKey="_id"
        toolBarRender={() => [
          <Button key="create" type="primary" onClick={onCreate}>
            新建
          </Button>,
        ]}
        actionRef={actionRef}
      />
      <ModalForm
        title="新增"
        onFinish={async (values) => {
          const {_id, ...rest} = values
          const {code} = await (_id ? updateUser(values) : createUser(rest))
          if (code ===0) {
            message.success('operate successfully!')
            formRef.current?.resetFields()
            actionRef.current?.reload();
            return true
          }
          return false;
        }}
        open={open}
        onOpenChange={setModalOpen}
        formRef={formRef}
      >
        {/** 用这个不显示的表单项区分新增还是修改 */}
        <ProFormText noStyle hidden name="_id" />
        <ProFormText name="name" label="Name" />
        <ProFormDigit name="age" label="Age" min={0} max={150} />
        <ProFormSelect
          name="sex"
          label="Gender"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />
      </ModalForm>
    </div>
  );
}
