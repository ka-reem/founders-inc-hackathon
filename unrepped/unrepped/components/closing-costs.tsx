"use client"

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronRight } from 'lucide-react';

type Fee = {
  name: string
  amount: number
  negotiable: boolean
  emoji: string
  description: string
}

type Category = {
  name: string
  fees: Fee[]
  emoji: string
}

const categories: Category[] = [
  {
    name: "'Loan'",
    emoji: "'💰'",
    fees: [
      {
        name: "'Origination Fee'",
        amount: 2500,
        negotiable: true,
        emoji: "'📝'",
        description: "Fee charged by the lender for processing loan. Its negotiable because lenders have flexibility in setting this fee."
      },
      {
        name: "' Credit Report Fee' ",
        amount: 50,
        negotiable: false,
        emoji: "'📊'",
        description: "Cost of obtaining your credit report. Its non-negotiable as its a fixed cost charged by credit bureaus."
      },
      {
        name: "'Appraisal Fee'",
        amount: 500,
        negotiable: true,
        emoji: "'🏠'",
        description: "'Fee for a professional property valuation. Its negotiable as you can often choose your own appraiser or compare prices."
      },
    ],
  },
  {
    name: "'Government'",
    emoji: "'🏛️'",
    fees: [
      {
        name: "Recording Fee",
        amount: 125,
        negotiable: false,
        emoji: "'📄'",
        description: "Fee charged by local government to record the property transfer. Its non-negotiable as its set by the government."
      },
      {
        name: "'Transfer Tax'",
        amount: 1000,
        negotiable: false,
        emoji: "'💸'",
        description: "Tax imposed by state/local government on property transfers. Its non-negotiable as its a fixed tax rate."
      },
    ],
  },
  {
    name: "'Inspection'",
    emoji: "'🔍'",
    fees: [
      {
        name: "'Home Inspection'",
        amount: 400,
        negotiable: true,
        emoji: "'🏡'",
        description: "'Fee for a professional inspection of the propertys condition. Its negotiable as you can choose your inspector and compare prices.'"
      },
      {
        name: "'Pest Inspection'",
        amount: 100,
        negotiable: true,
        emoji: "'🐜'",
        description: "'Fee for inspecting the property pest infestations. Its negotiable as you can shop around for different pest control companies."
      },
    ],
  },
  {
    name: "'Insurance'",
    emoji: "'🛡️'",
    fees: [
      {
        name: "'Homeowner\'s Insurance (12-month premium)'",
        amount: 1200,
        negotiable: true,
        emoji: "'🏘️'",
        description: "'Annual premium for property insurance. Its negotiable as you can compare rates from different insurance providers."
      },
      {
        name: "'Title Insurance'",
        amount: 800,
        negotiable: false,
        emoji: "'📜'",
        description: "'Insurance that protects against issues with the property title. Its typically non-negotiable as rates are often regulated by the state."
      },
      {
        name: "'Flood Insurance'",
        amount: 300,
        negotiable: true,
        emoji: "'🌊'",
        description: "'Insurance against flood damage if in a flood-prone area. Its negotiable as you can often choose between different providers and coverage levels."
      },
    ],
  },
]

const MAX_CHARS = 25 // Set the maximum number of characters before truncation

export function ClosingCostsComponent() {
  const [openCategories, setOpenCategories] = useState<string[]>([])
  const [expandedItems, setExpandedItems] = useState<string[]>([])

  const toggleCategory = (categoryName: string) => {
    setOpenCategories(prev =>
      prev.includes(categoryName)
        ? prev.filter(name => name !== categoryName)
        : [...prev, categoryName]
    )
  }

  const toggleExpandItem = (itemName: string) => {
    setExpandedItems(prev =>
      prev.includes(itemName)
        ? prev.filter(name => name !== itemName)
        : [...prev, itemName]
    )
  }

  const truncateText = (text: string) => {
    if (text.length <= MAX_CHARS) return text
    return text.slice(0, MAX_CHARS - 3) + "'...'"
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-100 min-h-screen font-sans overflow-y-auto">
      <div className="p-4 sm:p-6 md:p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Closing Cost Details</h1>
        
        <div className="mb-6 p-4 bg-white rounded-lg shadow-md text-sm flex justify-around">
          <p className="flex items-center">
            <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
            <span className="text-gray-700">Negotiable</span>
          </p>
          <p className="flex items-center">
            <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
            <span className="text-gray-700">Non-negotiable</span>
          </p>
        </div>

        <div className="space-y-4">
          {categories.map(category => (
            <div key={category.name} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 text-gray-800 flex justify-between items-center transition duration-300 ease-in-out border-b border-gray-200 active:bg-gray-200"
                onClick={() => toggleCategory(category.name)}
              >
                <span className="font-medium text-lg flex items-center">
                  <span className="mr-2">{category.emoji}</span>
                  {category.name}
                </span>
                {openCategories.includes(category.name) ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              {openCategories.includes(category.name) && (
                <div className="p-4 bg-white">
                  {category.fees.map(fee => (
                    <div key={fee.name} className="flex flex-col py-3 border-b last:border-b-0">
                      <div className="flex justify-between items-start w-full">
                        <button
                          onClick={() => toggleExpandItem(fee.name)}
                          className={`${fee.negotiable ? "'text-red-500'" : "'text-green-500'"} font-medium flex items-center cursor-pointer text-left`}
                        >
                          <span className="mr-2 flex-shrink-0">{fee.emoji}</span>
                          <span className="truncate">{truncateText(fee.name)}</span>
                          {fee.name.length > MAX_CHARS && (
                            <ChevronRight className="w-4 h-4 ml-1 text-gray-500 flex-shrink-0" />
                          )}
                        </button>
                        <span className="font-semibold text-gray-700 flex-shrink-0 ml-2">
                          ${fee.amount.toFixed(2)}
                        </span>
                      </div>
                      {expandedItems.includes(fee.name) && (
                        <div className="mt-2 text-sm text-gray-600 pl-6 w-full">
                          <p className="mb-1">{fee.name}</p>
                          <p>{fee.description}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}