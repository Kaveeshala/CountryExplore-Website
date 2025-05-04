import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Button, message, Spin, Form } from "antd";
import { User, Mail, Lock, Edit, Check, Globe, MapPin } from "lucide-react";

export default function Profile() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [user, setUser] = useState({});
  const token = localStorage.getItem("token");

  const fetchUser = async () => {
    try {
      const response = await axios.get("https://countryname-backend.onrender.com/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      form.setFieldsValue(response.data);
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      message.error("Failed to fetch user");
      console.error(error);
    }
  };

  const handleUpdate = async (values) => {
    try {
      setUpdating(true);
      await axios.put("https://countryname-backend.onrender.com/api/users", values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      message.success("Profile updated successfully");
      setUser({ ...user, ...values });
    } catch (error) {
      message.error("Update failed");
      console.error(error);
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="max-w-4xl mx-auto my-10 mt-26 px-4 relative">
      {/* Background decoration */}
      <div className="absolute -z-10 left-10 top-10 w-32 h-32 bg-emerald-100 rounded-full blur-3xl opacity-40"></div>
      <div className="absolute -z-10 right-10 bottom-10 w-40 h-40 bg-teal-100 rounded-full blur-3xl opacity-40"></div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden py-10 px-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full bg-emerald-100 flex items-center justify-center text-4xl font-bold text-black shadow-md">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <h1 className="text-2xl font-bold text-black mt-4">{user.name || "Unnamed User"}</h1>
          <div className="text-black mt-2 flex flex-col items-center gap-1 text-sm">
            <div className="flex items-center gap-1">
              <Mail size={14} /> <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} /> <span>Explorer</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe size={14} /> <span>Joined: May 4, 2025</span>
            </div>
          </div>
        </div>

        {/* Profile Edit Form */}
        <div className=" pt-6">
          <div className="flex items-center gap-2 mb-4">
            <Edit size={20} className="text-teal-600" />
            <h2 className="text-lg font-semibold text-black">Edit Profile</h2>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Spin size="large" />
            </div>
          ) : (
            <Form form={form} layout="vertical" onFinish={handleUpdate}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <Form.Item
                  label={<span className="text-black font-medium">Name</span>}
                  name="name"
                  rules={[{ required: true, message: "Please enter your name" }]}
                >
                  <Input
                    prefix={<User size={16} className="text-gray-400 mr-2" />}
                    className="border border-gray-300 rounded-lg px-3 py-3 hover:border-gray-300 transition-all focus:outline-none focus:ring-0"
                  />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  label={<span className="text-black font-medium">Email</span>}
                  name="email"
                  rules={[
                    { required: true, message: "Please enter your email" },
                    { type: "email", message: "Please enter a valid email" },
                  ]}
                >
                  <Input
                    prefix={<Mail size={16} className="text-gray-400 mr-2" />}
                    type="email"
                    className="py-2 px-4 rounded-lg border-gray-200"
                  />
                </Form.Item>

                {/* Current Password */}
                <Form.Item
                  label={<span className="text-black font-medium">Current Password</span>}
                  name="currentPassword"
                >
                  <Input.Password
                    prefix={<Lock size={16} className="text-gray-400 mr-2" />}
                    className="py-2 px-4 rounded-lg border-gray-200"
                  />
                </Form.Item>

                {/* New Password */}
                <Form.Item
                  label={<span className="text-black font-medium">New Password</span>}
                  name="newPassword"
                >
                  <Input.Password
                    prefix={<Lock size={16} className="text-gray-400 mr-2" />}
                    className="py-2 px-4 rounded-lg border-gray-200"
                  />
                </Form.Item>
              </div>

              {/* Submit Button */}
              <div className="mt-6 text-center">
                <button
                  type="primary"
                  htmlType="submit"
                  loading={updating}
                  className="bg-[#347928] text-white hover:bg-[#347928]/80 hover:text-white px-6 py-2 rounded-lg shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                 Update Profile
                </button>
              </div>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
}
