import React from 'react'
import { UserGroupIcon } from '@heroicons/react/24/solid'


function HomePage() {
  return (
    <div className="p-5 bg-gray-900 text-white h-screen">
      <h2 className="text-2xl font-semibold mb-5">Homepage</h2>

      <div className='flex space-x-5'>

        <div className="flex items-center space-x-3 bg-blue-950 w-50 min-h-20 justify-evenly items-cente rounded-md">
          <UserGroupIcon className="h-10 w-10" />
          <div>
            <h3 className=" font-semibold">Total Employee</h3>
            <p className="text-2xl font-bold">100</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3 bg-blue-950 w-50 min-h-20 justify-evenly items-cente rounded-md">
          <UserGroupIcon className="h-10 w-10" />
          <div>
            <h3 className=" font-semibold">Total Employee</h3>
            <p className="text-2xl font-bold">100</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 bg-blue-950 w-50 min-h-20 justify-evenly items-cente rounded-md">
          <UserGroupIcon className="h-10 w-10" />
          <div>
            <h3 className=" font-semibold">Total Employee</h3>
            <p className="text-2xl font-bold">100</p>
          </div>
        </div>

      </div>


    </div>
  )
}

export default HomePage