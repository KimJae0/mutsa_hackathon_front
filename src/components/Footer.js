import React from 'react';

function Footer() {
  return (
    <footer
      style={{ backgroundColor: 'rgb(242, 244, 246)', display: 'flex' }}
      className="footer h-20 justify-between items-center"
    >
      <div
        style={{ color: '#999' }}
        className="flex copyright w-1/2 text-sm ml-4"
      >
        <p>Copyright © 2024-2026 IldanOkay. All rights reserved.</p>
      </div>

      <div className="flex address w-1/2 justify-end">
        <p style={{ color: '#999' }} className="text-right text-sm mr-4">
          서울특별시 성동구 왕십리로 410
        </p>
      </div>
    </footer>
  );
}

export default Footer;
