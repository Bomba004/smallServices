/**
 * @file : src/components/global/LoaderScreen.tsx
 * @version : 2.0.0
 * @lastUpdatedAt : [{ "date": "01/11/2025", "by": ["BomBa"], "comment": "مكون شاشة تحميل محسن مع تصميم متجاوب وخصائص الوصولية" }]
 */

import './LoaderScreen.css';
import { 
  
  useSelector,
  useTranslation,

  type RootState,
} from '@/alias';

interface LoaderScreenProps {
  className?: string;
}

export const LoaderScreen: React.FC<LoaderScreenProps> = ({ className }) => {
    const { t } = useTranslation() // Hook الترجمة
  const { active, message } = useSelector((state: RootState) => state.loader);

  if (!active) return null;

  return (
    <div 
      className={`loader-screen ${className || ''}`}
      role="alert"
      aria-live="assertive"
      aria-label={message || t('loading.loading' as string)}
    >
      <div className="loader-screen__backdrop" />
      
      <div className="loader-screen__content">
        <div className="loader-screen__spinner-container">
          <div 
            className="loader-screen__spinner"
            role="progressbar"
            aria-valuetext={t('loading.loading' as string)}
          />
          <div className="loader-screen__spinner-overlay" />
        </div>
        
        {message && (
          <div className="loader-screen__message">
            <span className="loader-screen__text">{message}</span>
            <div className="loader-screen__dots">
              <span className="loader-screen__dot"></span>
              <span className="loader-screen__dot"></span>
              <span className="loader-screen__dot"></span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoaderScreen;