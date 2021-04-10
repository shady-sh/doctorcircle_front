import ReactPaginate from "react-paginate";

export function pageFilter(index, selectedPage) {
  if (index + 1 >= selectedPage * 10 - 9 && index + 1 <= selectedPage * 10) {
    return true;
  } else {
    return false;
  }
}

const Pagination = props => {
  const { count } = props;
  const selectedPage = ({ selected }) => props.selected(selected + 1);
  return (
    <div className="pageBox paginate-wrapper">
      <ReactPaginate
        pageCount={Math.ceil(count / 10)}
        pageRangeDisplayed={10}
        marginPagesDisplayed={0}
        breakLabel={""}
        previousLabel={<img src="/img/icon_prev_page.png" />}
        nextLabel={<img src="/img/icon_next_page.png" />}
        onPageChange={selectedPage}
        containerClassName="pagination"
        activeClassName="active"
        pageLinkClassName="page-link"
        breakLinkClassName="page-link"
        nextLinkClassName="page-link"
        previousLinkClassName="page-link mr-3"
        pageClassName="page-item"
        breakClassName="page-item"
        nextClassName="page-item ml-3"
        previousClassName="prev"
      />
    </div>
  );
};

export default Pagination;
