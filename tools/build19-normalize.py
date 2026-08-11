from pathlib import Path

stage3 = Path('curriculum-stage3.js')
text = stage3.read_text(encoding='utf-8')

text = text.replace(
"""        {id:'cinquante',fr:'Cinquante',vi:'50'},
        {id:'soixante',fr:'Soixante',vi:'60'},
        {id:'soixante-dix-quatre-vingts',fr:'Soixante-dix • quatre-vingts',vi:'70 • 80'},""",
"""        {id:'cinquante-soixante',fr:'Cinquante • soixante',vi:'50 • 60'},
        {id:'soixante-dix-quatre-vingts',fr:'Soixante-dix • quatre-vingts',vi:'70 • 80'},"""
)
text = text.replace(
"""        {id:'samedi',fr:'Samedi',vi:'Thứ Bảy'},
        {id:'dimanche',fr:'Dimanche',vi:'Chủ nhật'}""",
"""        {id:'weekend-jours',fr:'Samedi • dimanche',vi:'Thứ Bảy • Chủ nhật'}"""
)
text = text.replace(
"""        {id:'quelle-date',fr:'Quelle est la date ?',vi:'Hôm nay là ngày bao nhiêu?'},
        {id:'nous-sommes-le',fr:'Nous sommes le…',vi:'Hôm nay là ngày…'},
        {id:'mon-anniversaire-le',fr:'Mon anniversaire est le…',vi:'Sinh nhật của tôi là ngày…'}""",
"""        {id:'quelle-date',fr:'Quelle est la date ?',vi:'Hôm nay là ngày bao nhiêu?'},
        {id:'mon-anniversaire-le',fr:'Mon anniversaire est le…',vi:'Sinh nhật của tôi là ngày…'}"""
)
stage3.write_text(text, encoding='utf-8')

mastery = Path('mastery-stage3.js')
m = mastery.read_text(encoding='utf-8')
hook = """

  if (new URLSearchParams(location.search).get('stage3Smoke') === '1') {
    setTimeout(() => document.querySelector('.bottom-nav [data-go=\"progress\"]')?.click(), 140);
  }
"""
needle = "\n  window.FrenchTranquilleMasteryStage3={version:'1.12.0',build:19,metrics,nextPriority};"
if 'stage3Smoke' not in m:
    m = m.replace(needle, hook + needle)
mastery.write_text(m, encoding='utf-8')

quality_template = Path('tools/quality-build19.yml')
quality_target = Path('.github/workflows/quality.yml')
quality_target.write_text(quality_template.read_text(encoding='utf-8'), encoding='utf-8')

print('Build 19 normalization complete')
