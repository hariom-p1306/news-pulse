export default function Loading() {

    return (

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {

                Array.from({ length: 6 }).map((_, index) => (

                    <div
                        key={index}
                        className="bg-white rounded-xl shadow p-6 animate-pulse"
                    >

                        <div className="h-6 bg-gray-300 rounded w-3/4 mb-5"></div>

                        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>

                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>

                    </div>

                ))

            }

        </div>

    );

}