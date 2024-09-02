import React from 'react';

interface PersonalInfoProps {
  onNextStep: () => void;
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({ onNextStep }) => (
  <>
    <h2 className="text-3xl font-bold text-blue-900 mb-4">Personal info</h2>
    <p className="text-gray-500 mb-8">Please provide your name, email address, and phone number.</p>
    <form>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          id="name"
          placeholder="e.g. Stephen King"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="email">
          Email Address
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          id="email"
          placeholder="e.g. stephenking@lorem.com"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 mb-2" htmlFor="phone">
          Phone Number
        </label>
        <input
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="tel"
          id="phone"
          placeholder="e.g. +1 234 567 890"
        />
      </div>
      <button
        type="button"
        className="bg-blue-900 text-white px-6 py-3 rounded-lg"
        onClick={onNextStep}
      >
        Next Step
      </button>
    </form>
  </>
);

export default PersonalInfo;