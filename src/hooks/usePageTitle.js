import { useEffect } from "react";

function usePageTitle(page) {
  useEffect(() => {
    document.title = `Al-Noor | ${page}`;
  }, [page]);
}

export default usePageTitle;
