import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import styles from "./ErrorPage.module.css";
import { useEffect } from "react";

export default function ErrorPage() {
  const error = useRouteError();
  const isValidError = isRouteErrorResponse(error);
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <h1 className={styles.error}>
        {isValidError ? error.status : "알 수 없는"} 에러 발생
      </h1>
      <h2>{isValidError && error.data}</h2>
    </>
  );
}
