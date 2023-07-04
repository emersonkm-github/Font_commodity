import React from 'react';
import MaterialReactTable from 'material-react-table';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { ExportToCsv } from 'export-to-csv'; //or use your library of choice here
import { Button, Box } from '@mui/material';


//defining columns outside of the component is fine, is stable
const columns = [
  {
    accessorKey: 'name',
    header: '名稱',
    enableClickToCopy: true,

  },

  {
    accessorKey: 'priceUsd',
    header: '價格',

  },
  {
    accessorKey: 'changePercent24Hr',
    header: '24小時變化(%)',

  },
  {
    accessorKey: 'symbol',
    header: '代號',

    enableClickToCopy: true,
  },
  {
    accessorKey: 'vwap24Hr',
    header: '加權平均值(24小時)',

  },
  {
    accessorKey: 'volumeUsd24Hr',
    header: '成交額(百萬)(24小時)',

  },
  {
    accessorKey: 'marketCapUsd',
    header: '市值(百萬)',

  },
];

const csvOptions = {
  fieldSeparator: ',',
  quoteStrings: '"',
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: false,
  headers: columns.map((c) => c.header),
};

const csvExporter = new ExportToCsv(csvOptions);

function CoinsTable({ data }) {

  const handleExportRows = (rows) => {
    csvExporter.generateCsv(rows.map((row) => row.original));
  };

  const handleExportData = () => {
    csvExporter.generateCsv(data);
  };
  const data1 = data.map((item) => ({
    name: item.name,
    rank: item.rank,
    priceUsd: Number(item.priceUsd).toPrecision(5),
    changePercent24Hr: Number(item.changePercent24Hr).toPrecision(3),
    symbol: item.symbol,
    vwap24Hr: Number(item.vwap24Hr).toPrecision(6),
    volumeUsd24Hr: Number(item.volumeUsd24Hr / 1000000).toFixed(0),
    marketCapUsd: Number(item.marketCapUsd / 1000000).toFixed(0)

  }))

  return (
    <Box sx={{ width: "100%" , paddingLeft: '30px', paddingRight: '30px'  }}>

      <MaterialReactTable

        columns={columns}
        data={data1}
        enableRowSelection
        enableColumnResizing
        enableFullScreenToggle={false}
        enableHiding={false}
        enableFilterMatchHighlighting={false}
        muiTableProps={{
          sx: {
            tableLayout: 'auto',
          },
        }}
        initialState={{ density: 'compact' }}
        enableDensityToggle={false}
        muiTablePaperProps={{
          elevation: 10,
          sx: {
            borderRadius: '10',
            border: '1px solid #e0e0e0',
          },
        }}
        initialState={{ pagination: { pageSize: 10, pageIndex: 0 } }}

        defaultColumn={{
          minSize: 10, //allow columns to get smaller than default
          maxSize: 100, //allow columns to get larger than default
          size: 10, //make columns wider by default
        }}
        positionToolbarAlertBanner="bottom"
        renderTopToolbarCustomActions={({ table }) => (
          <Box
            sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}
          >
            <Button
              color="primary"
              //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
              onClick={handleExportData}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              匯出所有資料
            </Button>
            <Button
              disabled={table.getPrePaginationRowModel().rows.length === 0}
              //export all rows, including from the next page, (still respects filtering and sorting)
              onClick={() =>
                handleExportRows(table.getPrePaginationRowModel().rows)
              }
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              匯出所有橫行
            </Button>
            <Button
              disabled={table.getRowModel().rows.length === 0}
              //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
              onClick={() => handleExportRows(table.getRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              匯出頁面橫行
            </Button>
            <Button
              disabled={
                !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
              }
              //only export selected rows
              onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
              startIcon={<FileDownloadIcon />}
              variant="contained"
            >
              匯出所選橫行
            </Button>
          </Box>

        )}
      />
    </Box>
  );
};

export default CoinsTable;
