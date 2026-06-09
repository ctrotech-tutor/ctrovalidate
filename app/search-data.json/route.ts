import { getSearchData } from "@/lib/search-data"

export const dynamic = "force-static"

export async function GET() {
  const data = getSearchData()
  return Response.json(data)
}
