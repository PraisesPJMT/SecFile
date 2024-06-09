const useUtil = () => {
  const openRepository = () => window.indexBridge.openRepository()

  return {
    openRepository
  }
}

export default useUtil
