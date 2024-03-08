import { Trans, useTranslation } from "react-i18next";

const LanguageConversion = () => {
  const { t } = useTranslation();
  const description = t("description", { channel: "Internet Booking Engine" });
  return (
    <div>
      <div className="container">
    
        <h1>{t("greeting")}</h1>
        <span>
          <Trans
            i18nKey={description}
            values={{
              channel: "Internet Booking Engine",
            }}
            components={{ 1: <b /> }}
          ></Trans>
        </span>
        
      </div>
    </div>
  );
};

export default LanguageConversion;
