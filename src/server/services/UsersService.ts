import supabase from "@/shared/lib/supabase";

export async function getConsultations() {
  try {
    const { data: consultations } = await supabase
      .from("consultations")
      .select();
    return consultations;
  } catch (error) {
    throw new Error("Error al obtener las consultas: " + error);
  }
}
