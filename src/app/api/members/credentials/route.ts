import { NextResponse } from "next/server";
import { getDb } from "@/lib/firebase/admin";

// Update member credentials
export async function PATCH(request: Request) {
  try {
    const { memberId, username, password } = await request.json();

    if (!memberId) {
      return NextResponse.json(
        { ok: false, message: "Member ID is required" },
        { status: 400 },
      );
    }

    const db = getDb();
    const memberRef = db.collection("members").doc(memberId);
    const memberDoc = await memberRef.get();

    if (!memberDoc.exists) {
      return NextResponse.json(
        { ok: false, message: "Member not found" },
        { status: 404 },
      );
    }

    const memberData = memberDoc.data();
    
    // Generate username from name if not provided
    let finalUsername = username;
    if (!finalUsername && memberData?.name) {
      // Convert "Sahitya Singh" -> "sahitya"
      finalUsername = memberData.name.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
    }

    // Generate password from name if not provided
    let finalPassword = password;
    if (!finalPassword && memberData?.name) {
      // Convert "Sahitya Singh" -> "sahitya123"
      const firstName = memberData.name.split(" ")[0].toLowerCase().replace(/[^a-z0-9]/g, "");
      finalPassword = `${firstName}123`;
    }

    // Update the member document
    await memberRef.update({
      username: finalUsername,
      password: finalPassword,
      credentialsUpdated: new Date().toISOString(),
    });

    console.log(`✅ Updated credentials for ${memberData?.name}: ${finalUsername} / ${finalPassword}`);

    return NextResponse.json({
      ok: true,
      message: "Credentials updated successfully",
      credentials: {
        username: finalUsername,
        password: finalPassword,
      },
    });
  } catch (error) {
    console.error("❌ Error updating credentials:", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Failed to update credentials",
        error: String(error),
      },
      { status: 500 },
    );
  }
}
