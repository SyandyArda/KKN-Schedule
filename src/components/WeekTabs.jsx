import React from 'react';

const WEEKS = [
  { key: 1, label: 'MINGGU KE-1', dates: '29 Jul – 4 Agu' },
  { key: 2, label: 'MINGGU KE-2', dates: '5 – 11 Agu' },
  { key: 3, label: 'MINGGU KE-3', dates: '12 – 18 Agu' },
  { key: 4, label: 'MINGGU KE-4', dates: '19 – 27 Agu' },
];

/**
 * Tab navigation bar to switch between KKN weeks.
 */
export default function WeekTabs({ activeWeek, onWeekChange, countsByWeek }) {
  return (
    <div className="flex gap-2 sm:gap-3 flex-wrap justify-center sm:justify-start">
      {WEEKS.map(({ key, label, dates }) => {
        const isActive = activeWeek === key;
        const count = countsByWeek[key] ?? 0;
        return (
          <button
            key={key}
            id={`tab-week-${key}`}
            onClick={() => onWeekChange(key)}
            className={`
              relative flex flex-col items-center px-4 sm:px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm
              transition-all duration-200 cursor-pointer select-none
              ${isActive ? 'tab-active' : 'tab-inactive'}
            `}
          >
            <span className="font-bold tracking-wide">{label}</span>
            <span
              className={`text-[10px] mt-0.5 font-normal ${isActive ? 'text-green-100' : 'text-gray-400'}`}
            >
              {dates}
            </span>
            {/* Badge */}
            {count > 0 && (
              <span
                className={`
                  absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5
                  rounded-full text-[10px] font-bold flex items-center justify-center
                  ${isActive ? 'bg-white text-green-700' : 'bg-green-600 text-white'}
                `}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
