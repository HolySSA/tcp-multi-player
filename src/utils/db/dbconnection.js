export const dbConnection = async (pool) => {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS solution');
    console.log(`테스트 쿼리 결과:`, rows[0].solution);
  } catch (err) {
    console.error(`테스트 쿼리 실행 중 오류 발생:`, err);
  }
};
