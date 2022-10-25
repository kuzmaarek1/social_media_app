import React from 'react';
import { trend } from '../data/trend';

const TrendCard = () => {
  return (
    <div className="flex flex-col gap-4 bg-cardColor p-4 rounded-2xl pl-8">
      <h3 className="font-bold text-[1.17rem]">Trends for you</h3>
      {trend.map((trend) => {
        return (
          <div className="flex flex-col gap-2">
            <span className="font-bold">#{trend.name}</span>
            <span clasName="font-[16px]">{trend.shares}k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
