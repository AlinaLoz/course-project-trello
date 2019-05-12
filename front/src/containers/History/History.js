import History from '../../components/History';
import subscribeHistoryBySocket from "../../hoc/subscribeHistoryBySocket";
import subscribePagination from "../../hoc/subscribePagination";

export default subscribeHistoryBySocket(subscribePagination(History));