

export const generatePageNumbers = (totalPages : number, currentPage : number) => {
  const pageNumbers = [];
  const siblingCount = 1;
  const visiblePages = 2 + 2 * siblingCount;

  if (totalPages <= visiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  } 
  else {
    const leftElipsNumber = Math.max(currentPage - siblingCount, 1);
    const rightElipsNumber = Math.min(currentPage + siblingCount, totalPages);
    // show left elipses
    const showLeftElips = leftElipsNumber > 2;
    // show right elipses
    const showRightElips = rightElipsNumber < totalPages - 1;

    // Always show the first page
    pageNumbers.push(1);

    if (showLeftElips) {
      pageNumbers.push('...');
    }

    for (let i = leftElipsNumber; i <= rightElipsNumber; i++) {
      if (i !== 1 && i !== totalPages) {
        pageNumbers.push(i);
      }
    }

    if (showRightElips) {
      pageNumbers.push("...");
    }

    // Always show the last page
    pageNumbers.push(totalPages);

    return pageNumbers;
  }
};
