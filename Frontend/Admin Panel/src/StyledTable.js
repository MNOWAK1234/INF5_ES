// StyledTable.js
import styled from 'styled-components';

export const StyledTableContainer = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10% 10%; /* Add some padding to the sides */
`;

export const StyledTable = styled.table`
  width: 100%;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  table-layout: fixed;
`;

export const StyledTableCell = styled.td`
  padding: 15px;
  text-align: left;
`;

export const StyledTableHeader = styled.th`
  padding: 15px;
  text-align: left;
  background-color: #f2f2f2;
`;
