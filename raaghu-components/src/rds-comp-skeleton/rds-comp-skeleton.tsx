import React from "react";
import "./rds-comp-skeleton.css";
import RdsSkeleton, { RdsSkeletonShape } from "../../../raaghu-elements/src/rds-skeleton/rds-skeleton";

interface RdsCompSkeletonProps {
  type: "pagination" | "dropdown" | "card";
  isAnimated: boolean;
  count?: number;
  rows?: number;
  columns?: number;
  cardCount?: number;
}

const RdsCompSkeleton = (props: RdsCompSkeletonProps) => {
  const {
    type,
    isAnimated,
    count = 5,
    rows = 3,
    columns = 3,
    cardCount = 1,
  } = props;

  // Ensure count and rows are at least 1
  const validatedCount = Math.max(count, 1);
  const validatedRows = Math.max(rows, 1);
  const validatedColumns = Math.max(columns, 1);
  const validatedCardCount = Math.max(cardCount, 1);

  const renderSkeleton = () => {
    switch (type) {
      case "pagination":
        return (
          <div className="pagination-skeleton">
            {Array.from({ length: validatedCount }).map((_, index) => (
              <RdsSkeleton
                key={index}
                shape= {RdsSkeletonShape.RECTANGLE}
                isAnimated={isAnimated}
                width="25px"
                height="25px"
              />
            ))}
          </div>
        );
      case "dropdown":
        return (
          <div className="dropdown-skeleton">
            {Array.from({ length: validatedCount }).map((_, index) => (
              <div key={index} className="dropdown-item-skeleton">
                <RdsSkeleton
                  shape= {RdsSkeletonShape.CIRCLE}
                  isAnimated={isAnimated}
                  width="20px"
                  height="20px"
                />
                <RdsSkeleton
                  shape= {RdsSkeletonShape.RECTANGLE}
                  isAnimated={isAnimated}
                  width={`${Math.random() * 60 + 40}px`}
                  height="15px"
                />
              </div>
            ))}
          </div>
        );
      //       case "dataTable":
      //         return (
      //           <div className="data-table-skeleton">
      //             {Array.from({ length: validatedRows }).map((_, rowIndex) => (
      //               <div key={rowIndex} className="data-table-row-skeleton">
      //                 {Array.from({ length: validatedColumns }).map((_, colIndex) => (
      //                   <RdsSkeleton
      //                     key={colIndex}
      //                     shape="rectangle"
      //                     isAnimated={isAnimated}
      //                     width="100%"
      //                     height="50px"
      //                   />
      //                 ))}
      //               </div>
      //             ))}
      //           </div>
      //         );
      case "card":
        return (
          <div className="cards-container">
            {Array.from({ length: validatedCardCount }).map((_, index) => (
              <div className="card-width" key={index}>
                {defaultCardSkeleton()}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const defaultCardSkeleton = () => (
    <div className="card-skeleton">
      <div className="card-body-skeleton">
        <RdsSkeleton
          shape= {RdsSkeletonShape.RECTANGLE}
          isAnimated={isAnimated}
          width="25px"
          height="25px"
        />
        <RdsSkeleton
          shape= {RdsSkeletonShape.RECTANGLE}
          isAnimated={isAnimated}
          width="100%"
          height="8px"
        />
        <RdsSkeleton
          shape= {RdsSkeletonShape.RECTANGLE}
          isAnimated={isAnimated}
          width="100%"
          height="100px"
        />
        <RdsSkeleton
          shape= {RdsSkeletonShape.RECTANGLE}
          isAnimated={isAnimated}
          width="100%"
          height="10px"
        />
        <RdsSkeleton
          shape= {RdsSkeletonShape.RECTANGLE}
          isAnimated={isAnimated}
          width="40%"
          height="15px"
        />
      </div>
    </div>
  );

  return <div>{renderSkeleton()}</div>;
};

export default RdsCompSkeleton;
