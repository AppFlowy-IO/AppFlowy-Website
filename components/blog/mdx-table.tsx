import React, { ReactNode } from 'react';

interface TableProps {
  children: ReactNode;
}

const MDXTable: React.FC<TableProps> & {
  Head: React.FC<TableProps>;
  Body: React.FC<TableProps>;
  Row: React.FC<TableProps>;
  Header: React.FC<TableProps>;
  Cell: React.FC<TableProps>;
} = ({ children }) => {
  return (
    <div className='my-8 overflow-x-auto'>
      <table className='w-full text-left text-sm text-gray-500 dark:text-gray-400'>{children}</table>
    </div>
  );
};

const TableHead: React.FC<TableProps> = ({ children }) => {
  return (
    <thead className='bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400'>{children}</thead>
  );
};

const TableBody: React.FC<TableProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

const TableRow: React.FC<TableProps> = ({ children }) => {
  return <tr className='border-b bg-white dark:border-gray-700 dark:bg-gray-800'>{children}</tr>;
};

const TableHeader: React.FC<TableProps> = ({ children }) => {
  return (
    <th scope='col' className='px-6 py-3'>
      {children}
    </th>
  );
};

const TableCell: React.FC<TableProps> = ({ children }) => {
  return <td className='px-6 py-4'>{children}</td>;
};

MDXTable.Head = TableHead;
MDXTable.Body = TableBody;
MDXTable.Row = TableRow;
MDXTable.Header = TableHeader;
MDXTable.Cell = TableCell;

export default MDXTable;
