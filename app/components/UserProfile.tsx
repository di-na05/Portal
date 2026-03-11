"use client";

import { useState, useEffect } from "react";

interface UserData {
  id: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  branch: string;
  role: string;
  accessStatus: string;
  registeredAt: string;
  updatedAt: string;
}

export default function UserProfile() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      // Fetch the first employee (Super Admin) as current user
      // In a real app, this would fetch the authenticated user
      const response = await fetch("/api/employees");
      const employees = await response.json();
      
      if (Array.isArray(employees) && employees.length > 0) {
        setUserData(employees[0]);
      } else {
        setError("No user data found");
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setError("Failed to load profile data");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center py-12">
          <div className="spinner inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error || !userData) {
    return (
      <div className="bg-white rounded-lg shadow p-8">
        <div className="text-center text-red-600">
          <p className="text-lg font-medium mb-2">Error</p>
          <p>{error || "No profile data available"}</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    return status === "AUTHORIZED" 
      ? "bg-green-100 text-green-800" 
      : "bg-red-100 text-red-800";
  };

  return (
    <div className="bg-white rounded-lg shadow p-8">
      {/* Header Section */}
      <div className="mb-8 pb-6 border-b border-gray-200">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {userData.firstName} {userData.lastName}
            </h2>
            <p className="text-gray-600 text-lg">{userData.role}</p>
          </div>
          <div className={`px-4 py-2 rounded-lg font-semibold ${getStatusColor(userData.accessStatus)}`}>
            {userData.accessStatus === "AUTHORIZED" ? "✓ Authorized" : "✗ Unauthorized"}
          </div>
        </div>
      </div>

      {/* Main Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Employee ID */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-lg mr-2">👤</span>
            <label className="text-sm font-semibold">Employee ID</label>
          </div>
          <p className="text-lg font-medium text-gray-900">{userData.employeeId}</p>
        </div>

        {/* Email */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-lg mr-2">✉️</span>
            <label className="text-sm font-semibold">Email</label>
          </div>
          <p className="text-lg font-medium text-gray-900 break-all">{userData.email}</p>
        </div>

        {/* Phone */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-lg mr-2">📱</span>
            <label className="text-sm font-semibold">Phone</label>
          </div>
          <p className="text-lg font-medium text-gray-900">{userData.phone}</p>
        </div>

        {/* Branch */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-lg mr-2">📍</span>
            <label className="text-sm font-semibold">Branch</label>
          </div>
          <p className="text-lg font-medium text-gray-900">{userData.branch}</p>
        </div>

        {/* Role */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-lg mr-2">💼</span>
            <label className="text-sm font-semibold">Role</label>
          </div>
          <p className="text-lg font-medium text-gray-900">{userData.role}</p>
        </div>

        {/* Access Status */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-lg mr-2">🛡️</span>
            <label className="text-sm font-semibold">Access Status</label>
          </div>
          <p className={`text-lg font-medium ${userData.accessStatus === "AUTHORIZED" ? "text-green-700" : "text-red-700"}`}>
            {userData.accessStatus}
          </p>
        </div>

        {/* Registration Date */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-lg mr-2">📅</span>
            <label className="text-sm font-semibold">Registered On</label>
          </div>
          <p className="text-lg font-medium text-gray-900">{formatDate(userData.registeredAt)}</p>
        </div>

        {/* Last Updated */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center text-gray-600 mb-2">
            <span className="text-lg mr-2">📅</span>
            <label className="text-sm font-semibold">Last Updated</label>
          </div>
          <p className="text-lg font-medium text-gray-900">{formatDate(userData.updatedAt)}</p>
        </div>
      </div>

      {/* Action Section */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
