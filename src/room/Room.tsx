// import { Player } from "../core/player";
import { useEffect } from 'react';

import { Card } from '../poker/Card';
import { Table } from './Table';
export function Room() {
  useEffect(() => {
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Table>
      <Card code="As"></Card>
    </Table>
  );
}
