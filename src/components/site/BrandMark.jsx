import { Link } from 'react-router-dom';

export default function BrandMark({ className = '' }) {
  return (
    <Link to="/" className={`brand ${className}`.trim()} aria-label="AndroInfraMind home">
      <img src="/logo.png" alt="" className="brand-logo-img" aria-hidden="true" />
      <span className="brand-text">
        Andro<span>Infra</span>Mind
      </span>
    </Link>
  );
}
