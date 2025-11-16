import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import SingleApplication from "./SingleApplication";
import styles from "./Applications.module.css";
import { Application } from "./models/Application";
import { ApplicationService } from "./services/applicationsService";
import { Button } from "./ui/Button/Button";

const Applications = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const lastApplicationsRef = useRef<Application[]>([]);
  const [page, setPage] = useState(1);
  const loadingRef = useRef(false);
  const endOfListRef = useRef(false);

  lastApplicationsRef.current = applications;

  const handleLoadMoreClick = useCallback((): void => {
    if (loadingRef.current || endOfListRef.current) {
      return;
    }
    loadingRef.current = true;
    setPage((currentPage: number) => currentPage + 1);
  }, [setPage]);

  const buttonText = ((): ReactNode => {
    if (loadingRef.current) {
      return 'Loading';
    }
    if (endOfListRef.current) {
      return 'End of applications';
    }
    return 'Load more';
  })();

  useEffect(() => {
    const abortController = new AbortController();
    ApplicationService.getInstance().getPage(page, {
      signal: abortController.signal,
    })
      .then((newApplications): void => {
        if (newApplications.length === 0) {
          endOfListRef.current = true;
        }
        setApplications([
          ...lastApplicationsRef.current,
          ...newApplications,
        ]);
      }).finally((): void => {
        loadingRef.current = false;
      });

    return (): void => {
      abortController.abort();
    };
  }, [page, setApplications]);

  return (
    <div className={styles.Applications}>
      { applications.map((application) => (
        <SingleApplication key={application.guid} application={application} />
      ))}
      <Button disabled={loadingRef.current || endOfListRef.current} onClick={handleLoadMoreClick}>
        { buttonText }
      </Button>
    </div>
  );
};

export default Applications;
