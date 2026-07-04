"use client";

export default function SourceFilter({

    sources,
    selectedSource,
    onChange,

}) {

    return (

        <div className="mb-8">

            <label className="font-semibold mr-3">

                Filter by Source

            </label>

            <select

                value={selectedSource}

                onChange={(e) => onChange(e.target.value)}

                className="border rounded-lg px-4 py-2"

            >

                <option value="All">

                    All

                </option>

                {

                    sources.map((source) => (

                        <option

                            key={source}

                            value={source}

                        >

                            {source}

                        </option>

                    ))

                }

            </select>

        </div>

    );

}