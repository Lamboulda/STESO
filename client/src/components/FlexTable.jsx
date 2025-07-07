const FlexTable = ({ title, data, id, className = "" }) => {
  if (!data || data.length === 0) return null;

  return (
    <section id={id} className={`flextable-section ${className}`}>
      {title && <h2>{title}</h2>}
      <table className="flextable">
        <thead>
          <tr>
            {data[0].map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.slice(1).map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default FlexTable;
