import React from "react";

interface OrderedListProps extends React.HTMLAttributes<HTMLOListElement> {}

export const OrderedList: React.FC<OrderedListProps> = ({ ...delegated }) => {
  return <ol {...delegated} />;
};

interface UnorderedListProps extends React.HTMLAttributes<HTMLUListElement> {}

export const UnorderedList: React.FC<UnorderedListProps> = ({
  ...delegated
}) => {
  return <ul {...delegated} />;
};

interface TaskListProps extends UnorderedListProps {}

export const TaskList: React.FC<TaskListProps> = ({
  style,
  children,
  ...delegated
}) => {
  return (
    <ul
      style={{
        ...style,
        listStyle: "none",
      }}
      {...delegated}
    >
      {children}
    </ul>
  );
};
