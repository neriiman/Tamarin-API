type SqlValue = string | number | boolean | Date | null;
export const sql = () => {
  const values: SqlValue[] = [];
  const where: string[] = [];

  const addValue = (value: SqlValue) => {
    values.push(value);
    return `$${values.length}`;
  };

  const addWhere = (clause: string) => {
    where.push(clause);
  };

  return {
    values,
    where,
    addValue,
    addWhere,
  };
};
