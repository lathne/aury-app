export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="text-center p-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Você está offline
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Por favor, verifique sua conexão com a internet e tente novamente.
        </p>
      </div>
    </div>
  )
}