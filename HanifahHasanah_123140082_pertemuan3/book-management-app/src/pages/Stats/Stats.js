import React from 'react';
import useBookStats from '../../hooks/useBookStats';
import './Stats.css';

const Stats = () => {
  const stats = useBookStats();

  return (
    <div className="stats-page">
      <h1>📊 Statistik Buku Saya</h1>
      
      <div className="stats-grid">
        <div className="stat-card total">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>Total Buku</h3>
            <p className="stat-number">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card owned">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Sudah Punya</h3>
            <p className="stat-number">{stats.owned}</p>
          </div>
        </div>

        <div className="stat-card reading">
          <div className="stat-icon">📖</div>
          <div className="stat-info">
            <h3>Lagi Dibaca</h3>
            <p className="stat-number">{stats.reading}</p>
          </div>
        </div>

        <div className="stat-card wishlist">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>Wishlist</h3>
            <p className="stat-number">{stats.wishlist}</p>
          </div>
        </div>
      </div>

      <div className="stats-summary">
        <h2>Ringkasan</h2>
        <p>
          Kamu punya total <strong>{stats.total}</strong> buku dalam koleksimu.
        </p>
        {stats.reading > 0 && (
          <p>
            Saat ini kamu lagi baca <strong>{stats.reading}</strong> buku.
          </p>
        )}
        {stats.wishlist > 0 && (
          <p>
            Ada <strong>{stats.wishlist}</strong> buku yang pengen kamu beli.
          </p>
        )}
      </div>
    </div>
  );
};

export default Stats;